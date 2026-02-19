/**
 * GitHub Gists Sync Module - Smart Bi-directional Sync
 * Automatically merges changes from both local and remote
 */

class GitHubSync {
    constructor() {
        this.gistId = null;
        this.token = null;
        this.syncEnabled = false;
        this.lastSyncTime = null;
        this.syncStatus = 'Not configured';
        this.lastLocalHash = null;
    }

    // Initialize sync with user's token
    async init(token) {
        this.token = token;
        
        if (!token) {
            this.syncStatus = 'No token provided';
            return false;
        }

        // Try to find existing gist
        const existingGistId = localStorage.getItem('gist_id');
        if (existingGistId) {
            this.gistId = existingGistId;
            this.syncEnabled = true;
            this.syncStatus = 'Connected';
            return true;
        }

        // Create new gist
        try {
            await this.createGist();
            this.syncEnabled = true;
            this.syncStatus = 'Connected';
            return true;
        } catch (error) {
            console.error('Failed to initialize sync:', error);
            this.syncStatus = 'Failed: ' + error.message;
            return false;
        }
    }

    // Create a new private gist
    async createGist() {
        const response = await fetch('https://api.github.com/gists', {
            method: 'POST',
            headers: {
                'Authorization': `token ${this.token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                description: 'Time Tracker Data (Auto-synced)',
                public: false,
                files: {
                    'time-tracker-data.json': {
                        content: JSON.stringify({
                            events: [],
                            weekNotes: {},
                            typeColors: {},
                            lastSync: new Date().toISOString()
                        }, null, 2)
                    }
                }
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to create gist');
        }

        const data = await response.json();
        this.gistId = data.id;
        localStorage.setItem('gist_id', this.gistId);
        return this.gistId;
    }

    // Smart bi-directional sync - merges both local and remote changes
    async sync(localEvents, localWeekNotes, localTypeColors) {
        if (!this.syncEnabled || !this.token || !this.gistId) {
            throw new Error('Sync not configured');
        }

        // Get current local hash
        const currentLocalHash = this.hashData(localEvents, localWeekNotes, localTypeColors);

        // Pull remote data
        const remoteData = await this.pullData();

        // Check if local changed since last sync
        const localChanged = this.lastLocalHash !== currentLocalHash;
        
        // Merge logic
        let mergedEvents = [...localEvents];
        let mergedWeekNotes = {...localWeekNotes};
        let mergedTypeColors = {...localTypeColors};

        if (remoteData) {
            // Merge events - deduplicate by ID, keep most recent
            const eventMap = new Map();
            
            // Add local events
            localEvents.forEach(e => eventMap.set(e.id, e));
            
            // Add/update with remote events
            remoteData.events.forEach(e => {
                if (!eventMap.has(e.id)) {
                    eventMap.set(e.id, e);
                }
            });
            
            mergedEvents = Array.from(eventMap.values()).sort((a, b) => {
                const dateA = new Date(a.date + ' ' + a.startTime);
                const dateB = new Date(b.date + ' ' + b.startTime);
                return dateA - dateB;
            });

            // Merge week notes
            mergedWeekNotes = {...remoteData.weekNotes, ...localWeekNotes};
            
            // Merge colors
            mergedTypeColors = {...remoteData.typeColors, ...localTypeColors};
        }

        // Push merged data back
        await this.pushData(mergedEvents, mergedWeekNotes, mergedTypeColors);

        // Update hash
        this.lastLocalHash = this.hashData(mergedEvents, mergedWeekNotes, mergedTypeColors);
        this.lastSyncTime = new Date();
        this.syncStatus = 'Synced';

        return {
            events: mergedEvents,
            weekNotes: mergedWeekNotes,
            typeColors: mergedTypeColors
        };
    }

    // Pull data from GitHub
    async pullData() {
        const response = await fetch(`https://api.github.com/gists/${this.gistId}`, {
            headers: {
                'Authorization': `token ${this.token}`,
            }
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to pull data');
        }

        const gist = await response.json();
        const fileContent = gist.files['time-tracker-data.json'].content;
        const data = JSON.parse(fileContent);

        return {
            events: data.events || [],
            weekNotes: data.weekNotes || {},
            typeColors: data.typeColors || {}
        };
    }

    // Push data to GitHub
    async pushData(events, weekNotes, typeColors) {
        const data = {
            events,
            weekNotes,
            typeColors,
            lastSync: new Date().toISOString()
        };

        const response = await fetch(`https://api.github.com/gists/${this.gistId}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `token ${this.token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                files: {
                    'time-tracker-data.json': {
                        content: JSON.stringify(data, null, 2)
                    }
                }
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to push data');
        }

        return true;
    }

    // Simple hash for detecting changes
    hashData(events, weekNotes, typeColors) {
        const str = JSON.stringify({events, weekNotes, typeColors});
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return hash.toString();
    }

    // Check if sync is configured
    isConfigured() {
        return this.syncEnabled && this.token && this.gistId;
    }

    // Get sync status info
    getStatus() {
        return {
            enabled: this.syncEnabled,
            status: this.syncStatus,
            lastSync: this.lastSyncTime ? this.lastSyncTime.toLocaleString() : 'Never',
            gistId: this.gistId
        };
    }

    // Disconnect sync
    disconnect() {
        localStorage.removeItem('gist_id');
        localStorage.removeItem('github_token');
        this.gistId = null;
        this.token = null;
        this.syncEnabled = false;
        this.syncStatus = 'Disconnected';
        this.lastLocalHash = null;
    }
}

// Export for use in main app
window.GitHubSync = GitHubSync;

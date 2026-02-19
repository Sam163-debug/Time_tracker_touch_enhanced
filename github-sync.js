/**
 * GitHub Gists Sync Module
 * Syncs time tracker data across devices using GitHub Gists API
 */

class GitHubSync {
    constructor() {
        this.gistId = null;
        this.token = null;
        this.syncEnabled = false;
        this.lastSyncTime = null;
        this.syncStatus = 'Not configured';
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

    // Push local data to GitHub
    async push(events, weekNotes, typeColors) {
        if (!this.syncEnabled || !this.token || !this.gistId) {
            throw new Error('Sync not configured');
        }

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

        this.lastSyncTime = new Date();
        this.syncStatus = 'Synced';
        return true;
    }

    // Pull data from GitHub
    async pull() {
        if (!this.syncEnabled || !this.token || !this.gistId) {
            throw new Error('Sync not configured');
        }

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

        this.lastSyncTime = new Date();
        this.syncStatus = 'Synced';
        
        return {
            events: data.events || [],
            weekNotes: data.weekNotes || {},
            typeColors: data.typeColors || {}
        };
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
    }
}

// Export for use in main app
window.GitHubSync = GitHubSync;

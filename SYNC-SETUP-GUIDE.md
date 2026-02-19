# ☁️ GitHub Sync Setup Guide

## 📋 What You'll Get

✅ **Automatic data sync** across all your devices (iPad, laptop, phone)  
✅ **Backup** - Your data is safely stored in your GitHub account  
✅ **Version history** - GitHub keeps every version automatically  
✅ **Private** - Only you can access your data  
✅ **Free** - No extra accounts needed (uses your GitHub)

---

## 🚀 Quick Setup (5 minutes)

### Step 1: Create GitHub Personal Access Token

1. **Open this link** (it will take you to GitHub):
   ```
   https://github.com/settings/tokens/new?description=Time%20Tracker%20Sync&scopes=gist
   ```

2. **You'll see a form**:
   - **Note**: Already filled as "Time Tracker Sync" ✓
   - **Expiration**: Choose "No expiration" (or 90 days if you prefer)
   - **Permissions**: Make sure **"gist"** is checked ✓ (should be pre-selected)

3. **Scroll down** and click the green **"Generate token"** button

4. **Copy the token** - It looks like: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
   - ⚠️ **IMPORTANT**: You can only see this token ONCE! Copy it now!
   - Save it in a password manager or safe place

---

### Step 2: Connect Time Tracker to GitHub

1. **Open your Time Tracker** (on any device)

2. **Click "⚙️ Setup"** in the blue "GitHub Sync" panel

3. **Paste your token** in the text box

4. **Click "Connect GitHub"**

5. **Done!** You should see:
   - Status: "Connected ✓" (in green)
   - "⬆️ Sync Now" and "⬇️ Pull from GitHub" buttons appear

---

## 📱 Using Sync Across Devices

### First Device (e.g., your iPad):

1. Set up sync as described above
2. Click **"⬆️ Sync Now"** to upload your current data to GitHub
3. You'll see "Last sync: [time]" below

### Second Device (e.g., your laptop):

1. Open Time Tracker
2. Click "⚙️ Setup" and paste the **same token**
3. Click "Connect GitHub"
4. When asked, click **"⬇️ Pull from GitHub"**
5. Choose:
   - **OK** = Replace local data with GitHub data (recommended for new device)
   - **Cancel** = Merge GitHub data with local data

### Third Device, Fourth Device, etc.:

- Repeat the "Second Device" steps with the same token

---

## 🔄 Daily Usage

### Automatic Sync (Coming in next update):
- Currently, sync is **manual** - you need to click "⬆️ Sync Now"

### Manual Sync (Current):

**Before you leave your device:**
- Click **"⬆️ Sync Now"** to push your changes to GitHub

**When you switch devices:**
- Click **"⬇️ Pull from GitHub"** to get the latest data

**Best Practice:**
- Sync before closing the app
- Pull when opening on a different device

---

## 🔐 Security & Privacy

### Is my data safe?

✅ **Private by default** - Your Gist is created as "Secret" (not public)  
✅ **Encrypted in transit** - Uses HTTPS  
✅ **No third parties** - Only you and GitHub  
✅ **Your GitHub account** - Stored with your other private data  

### What's stored in the Gist?

A JSON file containing:
- Your events (title, type, date, time, notes)
- Week notes
- Custom colors
- Last sync timestamp

**Example**: `time-tracker-data.json`

### Can others see my data?

❌ **No** - The Gist is private ("Secret")  
✅ **Only you** can see it when logged into your GitHub account  
✅ You can view it at: `https://gist.github.com/[your-username]`

---

## 🛠️ Troubleshooting

### "Failed to initialize sync"

**Problem**: Token is invalid or expired  
**Solution**: 
1. Generate a new token (Step 1)
2. Click "Disconnect Sync"
3. Paste the new token and connect again

### "401 Unauthorized"

**Problem**: Token doesn't have the right permissions  
**Solution**: 
1. Go to GitHub → Settings → Developer settings → Personal access tokens
2. Delete the old token
3. Create a new one with "gist" permission checked

### "Sync failed: rate limit"

**Problem**: GitHub API has limits (60 requests/hour without auth, 5000/hour with)  
**Solution**: 
- Wait 1 hour
- Or use sync less frequently (it's unlikely to hit this limit with normal use)

### Data conflict between devices

**Problem**: Made changes on two devices without syncing  
**Solution**:
1. On Device A: Click "⬆️ Sync Now" (pushes changes)
2. On Device B: Click "⬇️ Pull from GitHub"
3. Choose "Merge" to combine both changes

### Lost my token

**Problem**: Didn't save the token  
**Solution**:
- Generate a new token (you can have multiple)
- Old token will still work on devices where it's already saved

---

## 📊 Advanced: View Your Data on GitHub

1. Go to: `https://gist.github.com/`
2. Look for **"Time Tracker Data (Auto-synced)"**
3. Click to view your JSON data
4. You can even edit it manually if needed!

---

## 🗑️ Disconnecting Sync

If you want to stop syncing:

1. Click **"⚙️ Settings"** in the sync panel
2. Click **"Disconnect Sync"** (red button)
3. Confirm

**What happens:**
- ✅ Your local data stays intact
- ✅ GitHub Gist stays (you can delete it manually if you want)
- ❌ No more automatic syncing
- ❌ Token removed from device

---

## 💡 Tips & Best Practices

### Recommended Workflow:

**Morning** (starting work):
```
1. Open Time Tracker
2. Click "⬇️ Pull from GitHub"
3. Start planning your day
```

**Evening** (end of day):
```
1. Add final events
2. Click "⬆️ Sync Now"
3. Close app
```

### Multiple Devices:

- **Designate one "main" device** where you enter most events
- **Other devices** pull data at the start of the day
- **Sync from main device** at the end of the day

### Backup Strategy:

- Your data is automatically backed up to GitHub
- Every sync creates a new version (GitHub keeps history)
- To restore old data: Go to your Gist → Click "Revisions" → View older versions

---

## 🎯 Quick Reference

| Action | Button | When to Use |
|--------|--------|-------------|
| Upload changes | ⬆️ Sync Now | After making changes |
| Download latest | ⬇️ Pull from GitHub | When switching devices |
| First time setup | ⚙️ Setup | Once per device |
| View settings | ⚙️ Settings | After connected |
| Stop syncing | Disconnect Sync | When removing device |

---

## ❓ FAQ

**Q: How much does this cost?**  
A: Free! GitHub Gists are free for unlimited private gists.

**Q: Is there a file size limit?**  
A: Yes, 100 MB per Gist. Your tracker data is tiny (~1-10 KB), so you'll never hit this.

**Q: Can I use this with multiple trackers?**  
A: Yes! Each tracker can have its own token, or use the same token (they'll create separate Gists).

**Q: What if I delete the Gist by accident?**  
A: Your local data is safe. Just click "⬆️ Sync Now" and it will recreate the Gist.

**Q: Can I share my data with someone?**  
A: Yes! In the Gist, click "Make secret → Make public" then share the URL. But this makes it public to everyone.

**Q: How do I export my data?**  
A: Two ways:
1. Export as PDF (built-in feature)
2. Download the JSON from your GitHub Gist

---

## 🆘 Need Help?

If sync isn't working:

1. Check the status message in the sync panel
2. Try disconnecting and reconnecting
3. Generate a fresh token
4. Make sure you're online (sync requires internet)

---

## 🔄 Coming Soon (Future Updates)

- ⏰ Automatic sync every 5 minutes
- 🔔 Sync notifications
- ⚡ Conflict resolution UI
- 📦 Bulk import/export
- 🌐 Share specific weeks with others

---

**Last Updated**: February 2026  
**Version**: 1.0 with GitHub Sync

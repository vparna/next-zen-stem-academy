# Quick MongoDB Setup Reference

## 🚀 Quick Start

### 1. Set Connection String
```bash
# In .env.local file
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/NextGen?retryWrites=true&w=majority
```

### 2. Initialize Database
```bash
npm run init-db
```

### 3. Verify Setup
- Check MongoDB Atlas → Browse Collections
- Confirm "NextGen" database exists
- Confirm 16 collections created
- Verify sample data (6 courses, 5 jobs)

## 📊 What Gets Created

### Collections (16 total)
✅ users  
✅ courses (6 seeded)  
✅ enrollments  
✅ children  
✅ certificates  
✅ lessons  
✅ quizzes  
✅ assignments  
✅ assignment_submissions  
✅ attendances  
✅ progress  
✅ live_classes  
✅ messages  
✅ jobs (5 seeded)  
✅ job_applications  
✅ coupons  

### Indexes Created
40+ indexes across all collections for optimal query performance

## 🛠️ Common Commands

| Command | Description |
|---------|-------------|
| `npm run init-db` | Initialize complete database |
| `npm run seed` | Seed only courses |
| `npm run seed-jobs` | Seed only jobs |
| `npm run validate-env` | Check environment variables |

## ⚠️ Troubleshooting

### Collections Not Showing
**Problem**: Only see `admin` and `local` databases  
**Solution**: Run `npm run init-db` with correct MONGODB_URI

### Connection Timeout
**Problem**: Cannot connect to MongoDB  
**Solutions**:
- Verify connection string is correct
- Check MongoDB Atlas network access (whitelist 0.0.0.0/0)
- Verify database user has read/write permissions

### No Sample Data
**Problem**: Collections exist but empty  
**Solution**: Run `npm run init-db` again (it won't duplicate data)

## 📖 Full Documentation

For complete setup instructions, see:
- [MONGODB_SETUP_GUIDE.md](MONGODB_SETUP_GUIDE.md) - Detailed guide
- [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) - Deployment instructions
- [README.md](README.md) - General documentation

## 🔗 Important Links

- [MongoDB Atlas](https://cloud.mongodb.com)
- [Vercel Dashboard](https://vercel.com/dashboard)
- [Project Repository](https://github.com/vparna/next-zen-stem-academy)

## ✅ Deployment Checklist

Before deploying to production:

- [ ] MongoDB Atlas cluster created
- [ ] Database user with permissions created
- [ ] Network access configured (0.0.0.0/0)
- [ ] Connection string includes "NextGen" database name
- [ ] `npm run init-db` executed successfully
- [ ] All 16 collections visible in Atlas
- [ ] Sample data verified (courses and jobs)
- [ ] Environment variables set in Vercel
- [ ] Application deployed and tested

---

**Need Help?** See [MONGODB_SETUP_GUIDE.md](MONGODB_SETUP_GUIDE.md) for detailed troubleshooting steps.

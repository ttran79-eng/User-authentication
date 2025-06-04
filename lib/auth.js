import { Lucia } from 'lucia';
import { BetterSqlite3Adapter } from '@lucia-auth/adapter-sqlite';

import db from './db';

const adapter = new BetterSqlite3Adapter(db,{
    user: 'users',// Table name for users
    session: 'sessions' // Table name for sessions
});

const lucia = new Lucia(adapter, { 
    sessionCookie: {
        expires: false, // Session cookies will not expire
        attributes: {
            secure: process.env.NODE_ENV === "production" // Secure cookies in production
        }
    }
});
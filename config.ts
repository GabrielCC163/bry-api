import dotenv from 'dotenv';
dotenv.config();

export default {
	timezone: process.env.TIMEZONE,
	db_url: process.env.DB_URL
};

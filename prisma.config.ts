// prisma.config.ts at your project root
import 'dotenv/config';

export default {
    schema: 'prisma/schema.prisma', // Path to your schema file
    datasource: {
        url: process.env.DATABASE_URL, // Connection URL from environment
    },
};
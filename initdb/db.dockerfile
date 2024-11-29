# Use the official PostgreSQL image as the base
FROM postgres:15

# Set environment variables for the PostgreSQL database
ENV POSTGRES_DB=db
ENV POSTGRES_USER=user
ENV POSTGRES_PASSWORD=coolpassword

# Copy the schema.sql file into the container
COPY schema.sql /docker-entrypoint-initdb.d/

# Expose the default PostgreSQL port
EXPOSE 5432
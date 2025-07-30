# Use Nginx as the base image
FROM nginx:alpine
# Remove the default Nginx static assets
RUN rm -rf /usr/share/nginx/html/*
# Copy your static website files to Nginx's default public directory
COPY /src /usr/share/nginx/html
# Expose port 80
EXPOSE 80
# Start Nginx
CMD ["nginx", "-g", "daemon off;"]


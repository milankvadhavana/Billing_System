
# Stage 1: Build Spring Boot application
FROM maven:3.9-eclipse-temurin-21 AS build

WORKDIR /app

# Copy Maven configuration
COPY pom.xml .

# Copy source code
COPY src ./src

# Build executable JAR
RUN mvn clean package -DskipTests

# Stage 2: Run application
FROM eclipse-temurin:21-jre

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

# Render uses the PORT environment variable
ENV PORT=10000

EXPOSE 10000

ENTRYPOINT ["java", "-jar", "app.jar", "--server.port=${PORT}"]

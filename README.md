
---

# <p align="center">VoyageVista: Journey to New Horizons </p>
<p align="center">
    <a href="https://github.com/Samundra-Subedi/VoyageVista" target="blank">
        <img src="https://img.shields.io/github/watchers/Samundra-Subedi/VoyageVista?style=for-the-badge&logo=appveyor" alt="Watchers"/>
    </a>
    <a href="https://github.com/Samundra-Subedi/VoyageVista/fork" target="blank">
        <img src="https://img.shields.io/github/forks/Samundra-Subedi/VoyageVista?style=for-the-badge&logo=appveyor" alt="Forks"/>
    </a>
    <a href="https://github.com/Samundra-Subedi/VoyageVista/stargazers" target="blank">
        <img src="https://img.shields.io/github/stars/Samundra-Subedi/VoyageVista?style=for-the-badge&logo=appveyor" alt="Star"/>
    </a>
    <a href="https://github.com/Samundra-Subedi/VoyageVista/issues" target="blank">
        <img src="https://img.shields.io/github/issues/Samundra-Subedi/VoyageVista?style=for-the-badge&logo=appveyor" alt="Issue"/>
    </a>
    <a href="https://github.com/Samundra-Subedi/VoyageVista/pulls" target="blank">
        <img src="https://img.shields.io/github/issues-pr/Samundra-Subedi/VoyageVista?style=for-the-badge&logo=appveyor" alt="Open Pull Request"/>
    </a>
    <a href="https://github.com/Samundra-Subedi/VoyageVista/blob/master/LICENSE" target="blank">
        <img src="https://img.shields.io/github/license/Samundra-Subedi/VoyageVista?style=for-the-badge&logo=appveyor" alt="License" />
    </a>
</p>

## Introduction

WanderSpot is more than just a travel web app—it's your gateway to exploring the world through the eyes of fellow travelers. Whether you're seeking iconic landmarks, local hotspots, or tranquil getaways, WanderSpot provides a platform to discover new places, share your experiences, and connect with a community of explorers.

## Features

- **Explore Places**: Browse through a curated list of places to visit, ranging from popular tourist spots to off-the-beaten-path treasures.
  
- **Add New Places**: Have a favorite spot that's not listed? Easily add new places to share with other users.
  
- **Get Recommendations**: Receive personalized suggestions based on your preferences and available list of places, powered by MindsDB's AI capabilities.
  
- **Review and Rate**: Share your experiences by adding reviews and ratings for places you've visited.
  
- **Sentiment Analysis**: MindsDB's AI analyzes reviews to provide sentiment insights, highlighting positive aspects and areas for improvement.
  
- **Key Highlights**: Discover key features and attractions of each place, helping you plan your visit effectively with AI.
  


## Demo 
<video src="https://github.com/user-attachments/assets/cc50fab1-76ed-4311-9eb9-1f77e30dc74c"></video>

## Getting Started

### Dependencies

- MindsDB
- Docker
- Node.js
- React

### Installation

#### Clone the Repository

```bash
git clone https://github.com/Samundra-Subedi/VoyageVista.git
```

#### Install MindsDB and Run Docker Container:

```bash
docker run --name mindsdb_container -p 47334:47334 -p 47335:47335 mindsdb/mindsdb

```
For further information visit [mindsdb docs](https://docs.mindsdb.com/setup/self-hosted/docker).

#### Frontend Setup

Navigate to the frontend directory and install dependencies:

```bash
cd VoyageVista/frontend
npm install
```

Start the development server:

```bash
npm run dev
```

#### Backend Setup

Navigate to the server directory and install dependencies:

```bash
cd ../backend
npm install
```

Set up the environment variables by creating a `.env` file in the backend directory and add your MINDSDB_API_KEY. Click [here](https://mdb.ai/) to get it.

```bash
MINDSDB_API_URL=http://localhost:47334/api/sql/query
MINDSDB_API_KEY=MINDSDB_API_KEY
```

Start the backend server:

```bash
npm run dev
```

Visit the frontend application by navigating to:

```
http://localhost:5173/
```

Make sure that the backend server is running at:

```
http://localhost:3000
```


## Contributing

We welcome contributions from the community! If you'd like to contribute to StudyMate, please follow these steps:

1. **Fork the Repository**: Click the "Fork" button on GitHub to create your copy.

2. **Clone Your Fork**:
   ```bash
   git clone https://github.com/Samundra-Subedi/VoyageVista.git
   ```

3. **Create a Branch**:
   ```bash
   git checkout -b your-branch-name
   ```

4. **Make Changes**: Implement your changes.

5. **Commit Your Changes**:
   ```bash
   git commit -m "Description of your changes"
   ```

6. **Push Your Changes**:
   ```bash
   git push -u origin your-branch-name
   ```

7. **Create a Pull Request**: Submit your changes for review.



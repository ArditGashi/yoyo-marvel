
# Marvel Characters App

## Overview

The Marvel Characters App is a React Native application that allows users to explore various Marvel characters, series, and comics. The app utilizes the Marvel API to fetch character details, series, and comics, providing a comprehensive view of Marvel's vast universe.

## Features

- **Character Carousel**: A rotating carousel displaying Marvel characters.
- **Character Detail**: Detailed view of each character including their description, comics, series, and stories they are featured in.
- **Recommended Series Slider**: A horizontal scroll view showcasing recommended Marvel series.
- **Top Comics Slider**: A horizontal scroll view showcasing top Marvel comics.
- **Prefetching**: Prefetching of additional data and images for enhanced user experience.
- **Loading Animations**: Smooth loading animations using Lottie files.

## Tech Stack

- **React Native**: For building the mobile application.
- **Expo**: For development and build tools.
- **Axios**: For making API requests.
- **Marvel API**: For fetching Marvel character, series, and comics data.
- **Lottie**: For loading animations.
- **TypeScript**: For type checking and better code maintainability.

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/yoyo-marvel.git
   ```

2. **Navigate to the project directory**:
   ```bash
   cd yoyo-marvel
   ```

3. **Install dependencies**:
   ```bash
   yarn install
   ```

4. **Set up environment variables**:
   Create an `.env` file in the root directory and add your Marvel API keys:
   ```
   EXPO_PUBLIC_MARVEL_PUBLIC_API_KEY=your_public_api_key
   EXPO_PUBLIC_MARVEL_PRIVATE_API_KEY=your_private_api_key
   ```

   Get these from Marvel Api.

5. **Run the app**:
   ```bash
  yarn start
   ```

## Usage

### Home Screen

- **Character Carousel**: Displays a rotating list of Marvel characters. Click on a character to view their details.
- **Recommended Series Slider**: Scroll horizontally to view recommended Marvel series.
- **Top Comics Slider**: Scroll horizontally to view top Marvel comics.

### Character Detail Screen

- **Description**: Provides a description of the character.
- **Comics**: Shows the number of comics the character appears in. Click the "View Comics" button to explore further.
- **Series**: Shows the number of series the character appears in. Click the "View Series" button to explore further.
- **Stories**: Shows the number of stories the character appears in. Click the "View Stories" button to explore further.

## Code Structure

- **`/api`**: Contains API request functions for fetching data from the Marvel API.
- **`/components`**: Contains React components used throughout the app.
- **`/constants`**: Contains color schemes and other constants.
- **`/screens`**: Contains screen components for different app views.

## Contributing

1. **Fork the repository**.
2. **Create a new branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**.
4. **Commit your changes**:
   ```bash
   git commit -m 'Add some feature'
   ```
5. **Push to the branch**:
   ```bash
   git push origin feature/your-feature-name
   ```
6. **Create a Pull Request**.

## License

This project is licensed under the MIT License. See the LICENSE file for more information.

## Acknowledgements

- **Marvel API**: For providing the data used in the app.
- **Expo**: For the development environment and build tools.
- **Lottie**: For the loading animations.

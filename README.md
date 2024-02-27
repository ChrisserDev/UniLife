# UniLife

https://unilifeaccomodation.netlify.app/

## Overview
UniLife App is a web application developed to elevate the university experience for students, focusing on accommodation solutions. It serves as a centralized platform where students can explore and secure housing options tailored to their needs. With a user-friendly interface, UniLife App simplifies the process of finding suitable accommodations, making the transition to university life smoother and more convenient.

## Key Features

### City Search

Users can search for student accommodations by selecting a city from a dropdown. The application provides a list of top cities with accommodations.

### Accommodation Filtering
Users can filter accommodations based on criteria such as bedroom count, bathroom count, price, and property type.

### Accommodation Details

Detailed information about each accommodation, including images, key features, bedroom prices, and availability.

### Shortlisting

Users can add or remove accommodations from their shortlist. The shortlist status is dynamically updated based on user actions.

### Booking Viewing:

Users can initiate the booking process for a viewing by filling out a form. A modal is used for a better user experience during the booking process.

## Functionalities

### API Integration

Axios is used for making HTTP requests to fetch data from a server. This was used to get information about cities, property types, and accommodation details.

### Dynamic Rendering

React components are dynamically rendered based on fetched data. Accommodation details and cities are dynamically populated.

### State Management:

React useState is used for managing local component states, including city data, property details, and form data.

### Routing:

React useParams and useNavigate are used for handling routing and passing parameters between components.

### Conditional Rendering:

Components conditionally render content based on the availability of data or user actions. Conditional statements are used to display appropriate messages when no accommodations match the criteria.

### Form Handling:

Form data is managed using React useState. Form submission and validation are handled, providing feedback to users.

### Slider Component:

A slider library package has been used, enhancing the visual appeal of the application.

### Responsieve Design

This web application has a responsive design strategy, incorporating media queries for both tablet and mobile devices. It focuses on optimizing layout, font sizes, and element positioning to ensure an optimal user experience across various screen sizes. The adjustments include modifications to banner containers, search functionality, city cards, features section, and font sizes, providing a seamless and visually appealing presentation on tablets and mobile phones.

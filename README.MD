
# LinguaLearn

LinguaLearn is an Angular CRUD application built as a final project for the course I currently attend - Angular June 2023 @SoftUni. LinguaLearn is an educational application that can help you learn the language that you have wanted to learn since you were a kid, but never had the chance to. The application is fully responsive, so you can use it from any device!

# 1. Technical Description

### LinguaLearn was built using with:  
- [**Angular**](https://angular.io/) - Front-End
- [**Express REST API**](https://expressjs.com/) - Back-End
- [**Toastr**](https://www.npmjs.com/package/ngx-toastr) - Notifications
- **Pure CSS**

# 2. Hosting Information
You can check out the project at: [https://lingua-learn.netlify.app/home](https://lingua-learn.netlify.app/home)

You can check out the Back-End REST API at: [https://github.com/kristiyanpts/Angular-Final-Project-REST-API](https://github.com/kristiyanpts/Angular-Final-Project-REST-API)

### IMPORTANT!

Back-End REST API is hosted on [Render](https://render.com/) with a free plan that has some limitations. If you get a blank error when you enter the website or courses aren't loading, please wait for up to 2 minutes and refresh. The reason for that is due to the host being free and if not used recently it spins down.

![Imgur](https://imgur.com/aPArXlm.png)

## 3. Structure

### 3.1 Public Part - No Authorization Needed
- Home: User is greeted with a warm welcome and is prompted to register, view the current courses or take a look at 6th latest courses by scrolling down.
- Courses: User is prompted to take a look at our teachers or view all of our available courses.
- Teachers: User is prompted to become part of our team of teachers or can just look at our team of teachers.
- Contact: Information about our whereabouts is displayed, as well a contact form for the user to get in touch with us.
- Course Details: User can view all of the available date for the selected course such as description, schedule, students who have already signep up for the course etc.
- Profile: User can view other people's profile page to get to know them

### 3.2 Private Part - Authorization Needed
- Course Creation: Authorized users that are registered as teachers can create a new course. However, authorized users that are registered as students can not create courses!
- Course Details: Authorized users who are not the creator/teacher of the course can sign up for that course. If all went well they will be able to see there name in the list of students. Authorized user who is the creator/teacher of the course can edit the course, delete the course and expell students from the course.
- Course Editing: By clicking the edit button the creator/teacher is redirected to the editing page where they can change everything about the course, except the capacity.
- Profile: Authorized user can edit there profile information by navigating to their profile and clicking the edit button.
- Admin Panel: Authorized users who are admins of the application can access the admin panel.

## 4. Scripts
### 1. Starting the application locally

**OPTIONAL** - If you want to start the application fully locally

Step 1: Download or clone this repository

- Step 1.1 (Optional): Download or clone the following repositoty containing the REST API - [https://github.com/kristiyanpts/LinguaLearn-REST-API](https://github.com/kristiyanpts/LinguaLearn-REST-API)
- Step 1.2 (Optional) - To run the app locally you also need to download MongoDB

Step 2: Open it in VS Code

- Step 2.1 (Optional): Open the REST API in a different VS Code window
- Step 2.2 (Optional): Head to LinguaLearn/src/app/core/constants/api.constants.ts and uncomment the second line

Step 3: Open a terminal (Both windows)

Step 4: Run the following commands

```
REST API Window:
npm i
npm start

Project Window:
npm i
npm start OR ng serve
```

Step 5: Wait for the application to start and head to [http://localhost:4200](http://localhost:4200)

### 2. Building the application for production
Step 1: Steps 1-4 above
Step 2: Run the following command

```
npm build OR ng build
```

Step 3: Wait for the application to build and you will see a folder named "dist".


## 5. Screenshots

### Home Page
![Imgur](https://imgur.com/jBuZPgY.png)

### Courses Page
![Imgur](https://imgur.com/delwwVr.png)

### Teachers Page
![Imgur](https://imgur.com/Rykhjz1.png)

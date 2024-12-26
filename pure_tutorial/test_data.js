// Create a new user
const newUser = new Student({
  name: 'John Doe',
  email: 'johndoe@example.com',
  age: 25,
});

// Save the user to the database
newUser.save()
  .then(student => {
    console.log('User saved:', student);
  })
  .catch(err => {
    console.error('Error saving user:', err);
  });

const { registerUser, loginUser } = require('../authService');

describe('Auth Service', () => {
  it('should register a new user', async () => {
    const user = await registerUser({
        name: 'Test Doe',
        email: 'test4@example.com',
        password: 'securepassword',
        role: 'tenant',
        phone: '1234567890',
      });
    expect(user).toHaveProperty('id');
    expect(user.email).toBe('test3@example.com');
    expect(user.role).toBe('tenant');
  });
});


describe('Auth Service2', () => {
    it('should log in a user', async () =>{
        const user = await loginUser({
            email: "test2@example.com",
            password: 'securepassword'
        });
        console.log(user);
        expect(user.token).toBeTruthy();
        expect(user.user).toHaveProperty('id');
        expect(user.user.email).toBe('test2@example.com');
    });

});

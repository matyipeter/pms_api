const { registerUser, loginUser, generateResetToken, resetPassword } = require('../authService');


// If you want to test register, change the data of the user
describe('Auth Service', () => {
  it('should register a new user', async () => {
    const user = await registerUser({
        name: 'Test Doe5',
        email: 'test5@example.com',
        password: 'securepassword',
        role: 'tenant',
        phone: '1234567890',
      });
    expect(user).toHaveProperty('id');
    expect(user.email).toBe('test5@example.com');
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

    it("shouldn't log in a user with invalid credentials", async () => {
        await expect(loginUser({
            email: "test2@example.com",
            password: 'wrongpassword'
        })).rejects.toThrow('Invalid credentials');
    });

    it("shouldn't log in a user with non-existent email", async () => {
        await expect(loginUser({
            email: "nonexistent@example.com",
            password: 'securepassword'
        })).rejects.toThrow('Invalid credentials');
    });

    it("shouldn't log in a user with invalid email", async () => {
        await expect(loginUser({
            email: "invalidemail",
            password: 'securepassword'
        })).rejects.toThrow('Invalid credentials');
    });

    it("shouldn't log in a user with invalid password", async () => {
        await expect(loginUser({
            email: "test2@example.com",
            password: 'wrongpassword'
        })).rejects.toThrow('Invalid credentials');
    });

});

describe('Auth Service3', () => {
    let resetToken = "";
    it('should generate a reset token', async () => {
        resetToken = await generateResetToken('test3@example.com');
        expect(resetToken).toBeTruthy();
    });

    it('should reset a password', async () => {
      const result = await resetPassword(resetToken, 'newpassword');
      expect(result).toHaveProperty('message');
      expect(result.message).toBe('Password reset successful');
    });

    it("shouldn't generate a reset token for non-existent user", async () => {
        await expect(generateResetToken('nonexistent@example.com')).rejects.toThrow('User not found');
        
    });
});


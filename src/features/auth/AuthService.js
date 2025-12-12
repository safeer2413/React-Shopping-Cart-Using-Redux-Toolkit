import jwtEncode from "jwt-encode";

const SECRET_KEY = "MY_SUPER_SECRET_KEY_12345"; // Change this in real project

// Local "DB" simulation
const USER_DB_KEY = "APP_USERS";

const AuthService = {
    // Save users to localStorage (acts like DB)
    saveUsers(users) {
        localStorage.setItem(USER_DB_KEY, JSON.stringify(users));
    },

    // Load users
    loadUsers() {
        return JSON.parse(localStorage.getItem(USER_DB_KEY)) || [];
    },

    // Hash password (simple SHA-256 hashing)
    async hashPassword(password) {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hash = await crypto.subtle.digest("SHA-256", data);
        return Array.from(new Uint8Array(hash))
            .map(b => b.toString(16).padStart(2, "0"))
            .join("");
    },

    // SIGNUP
    async signup(name, email, password) {
        const users = this.loadUsers();

        // Check if user already exists
        if (users.find(u => u.email === email)) {
            throw new Error("User already exists");
        }

        const hashedPassword = await this.hashPassword(password);

        const newUser = { name, email, password: hashedPassword };

        users.push(newUser);
        this.saveUsers(users);

        return {
            user: { name, email },
            message: "Signup successful",
        };
    },

    // LOGIN
    async login(email, password) {
        const users = this.loadUsers();

        const hashedPassword = await this.hashPassword(password);

        const existingUser = users.find(
            (u) => u.email === email && u.password === hashedPassword
        );

        if (!existingUser) {
            throw new Error("Invalid email or password");
        }

        // JWT token creation
        const payload = {
            email,
            time: Date.now(),
        };

        const token = jwtEncode(payload, SECRET_KEY);

        return {
            user: { name: existingUser.name, email },
            token,
        };
    },
};

export default AuthService;
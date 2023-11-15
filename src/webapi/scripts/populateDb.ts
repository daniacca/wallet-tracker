import { IUser, Roles } from "../models/interfaces/IUser";
import User from "../models/user";

const adminData: IUser = {
  email: "admin@administrator.com",
  name: "Administrator",
  password: "admin",
  role: Roles.ADMIN,
};

const testUserData: IUser = {
  email: "user@test.com",
  name: "Test User",
  password: "test",
  role: Roles.USER,
};

async function createAdmin() {
  const user = await User.findOne({ email: adminData.email });
  if (user) return;
  const admin = new User(adminData);
  await admin.save();
}

async function createTestUser() {
  const user = await User.findOne({ email: testUserData.email });
  if (user) return;
  const testUser = new User(testUserData);
  await testUser.save();
}

export default async function populateDb() {
  await createAdmin();
  await createTestUser();
}

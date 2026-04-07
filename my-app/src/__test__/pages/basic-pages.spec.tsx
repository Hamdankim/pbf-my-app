import { render, screen } from "@testing-library/react";
import { describe, expect, it, jest } from "@jest/globals";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

jest.mock("next/font/google", () => ({
  Inter: () => ({ className: "" }),
}));

const HomePage = require("../../pages/index").default;
const AdminPage = require("../../pages/admin").default;
const BlogPage = require("../../pages/blog").default;
const UserPage = require("../../pages/user").default;
const PasswordPage = require("../../pages/user/password").default;
const EditProfilePage = require("../../pages/profile/edit").default;
const SettingPage = require("../../pages/setting/app").default;
const Custom404Page = require("../../pages/404").default;

describe("Basic pages", () => {
  it("renders the home page", () => {
    render(<HomePage />);

    expect(screen.getByText("Praktikum Next.js Pages Router").textContent).toBe(
      "Praktikum Next.js Pages Router",
    );
  });

  it("renders the admin page", () => {
    render(<AdminPage />);

    expect(screen.getByText("Halaman Admin").textContent).toBe("Halaman Admin");
  });

  it("renders the blog page", () => {
    render(<BlogPage />);

    expect(screen.getByText("Blog Page").textContent).toBe("Blog Page");
  });

  it("renders the user page", () => {
    render(<UserPage />);

    expect(screen.getByText("User Setting Page").textContent).toBe(
      "User Setting Page",
    );
  });

  it("renders the password page", () => {
    render(<PasswordPage />);

    expect(screen.getByText("Password Setting Page").textContent).toBe(
      "Password Setting Page",
    );
  });

  it("renders the edit profile page", () => {
    render(<EditProfilePage />);

    expect(screen.getByText("Edit Profile Page").textContent).toBe(
      "Edit Profile Page",
    );
  });

  it("renders the setting page", () => {
    render(<SettingPage />);

    expect(screen.getByText("App Setting Page").textContent).toBe(
      "App Setting Page",
    );
  });

  it("renders the custom 404 page", () => {
    render(<Custom404Page />);

    expect(screen.getByText("404 - Halaman Tidak Ditemukan").textContent).toBe(
      "404 - Halaman Tidak Ditemukan",
    );
  });
});

import { render, screen } from "@testing-library/react";
import { describe, expect, it, jest, beforeEach } from "@jest/globals";

const mockUseSession = jest.fn();
const mockSignIn = jest.fn();
const mockSignOut = jest.fn();

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

jest.mock("next-auth/react", () => ({
  useSession: () => mockUseSession(),
  signIn: (...args: unknown[]) => mockSignIn(...args),
  signOut: (...args: unknown[]) => mockSignOut(...args),
}));

const ProfilePage = require("../../pages/profile").default;
const EditorPage = require("../../pages/editor").default;
const Navbar = require("../../components/layouts/Navbar").default;

beforeEach(() => {
  mockUseSession.mockReset();
  mockSignIn.mockReset();
  mockSignOut.mockReset();
});

describe("Session-based layout pages", () => {
  it("renders the profile page with the current user", () => {
    mockUseSession.mockReturnValue({
      data: { user: { fullname: "Hamdan Azizul Hakim" } },
    });

    render(<ProfilePage />);

    expect(screen.getByText("Halaman Profile").textContent).toBe(
      "Halaman Profile",
    );
    expect(
      screen.getByText("Selamat Datang Hamdan Azizul Hakim").textContent,
    ).toBe("Selamat Datang Hamdan Azizul Hakim");
  });

  it("renders the editor page with the current user", () => {
    mockUseSession.mockReturnValue({
      data: { user: { fullname: "Hamdan Azizul Hakim" } },
    });

    render(<EditorPage />);

    expect(screen.getByText("Halaman Editor").textContent).toBe(
      "Halaman Editor",
    );
    expect(
      screen.getByText("Selamat datang Hamdan Azizul Hakim").textContent,
    ).toBe("Selamat datang Hamdan Azizul Hakim");
  });

  it("renders the navbar sign-in state", () => {
    mockUseSession.mockReturnValue({ data: null });

    render(<Navbar />);

    expect(screen.getByText("MyApp").textContent).toBe("MyApp");
    expect(screen.getByRole("button", { name: "Sign In" }).textContent).toBe(
      "Sign In",
    );
  });

  it("renders the navbar signed-in state", () => {
    mockUseSession.mockReturnValue({
      data: {
        user: {
          fullname: "Hamdan Azizul Hakim",
          role: "admin",
          image: "/avatar.png",
        },
      },
    });

    render(<Navbar />);

    expect(
      screen.getByText("Welcome, Hamdan Azizul Hakim (admin)").textContent,
    ).toBe("Welcome, Hamdan Azizul Hakim (admin)");
    expect(screen.getByRole("button", { name: "Sign Out" }).textContent).toBe(
      "Sign Out",
    );
  });
});

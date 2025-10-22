import "@testing-library/jest-dom";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import { useParams, useRouter } from "next/navigation";
import { useIndexedDBUsers } from "@/hooks/useUserDB";
import { notifications } from "@mantine/notifications";
import UserDetailPage from "./page";
import { USER_STATUS_E } from "@/types/extra-enums";

jest.mock("@/hooks/useUserDB");
jest.mock("next/navigation", () => ({
  useParams: jest.fn(),
  useRouter: jest.fn(),
}));
jest.mock("@mantine/notifications", () => ({
  notifications: {
    show: jest.fn(),
  },
}));

const mockUser = {
  id: "1",
  user_code: "LSQ-12345",
  status: USER_STATUS_E.ACTIVE,
  created_at: "2024-01-10",
  organization: "Lendsqr",
  tier_stars: 3,
  account_balance: "₦200,000.00",
  bank_account: "9876543210/Providus Bank",
  personal_information: {
    full_name: "John Doe",
    email: "john@example.com",
    phone_number: "07011112222",
    bvn: "12345678901",
    gender: "Male",
    marital_status: "Single",
    children: "None",
    type_of_residence: "Parent's Apartment",
  },
  education_and_employment: {
    level_of_education: "B.Sc",
    employment_status: "Employed",
    sector_of_employment: "FinTech",
    duration_of_employment: "2 years",
    office_email: "john.doe@company.com",
    monthly_income: "₦200,000 - ₦400,000",
    loan_repayment: "₦40,000",
  },
  socials: {
    twitter: "@johndoe",
    facebook: "johndoe",
    instagram: "@johndoe",
  },
  guarantors: [
    {
      full_name: "Jane Doe",
      phone_number: "07033334444",
      email: "jane@example.com",
      relationship: "Sister",
    },
  ],
};

describe("User Detail Page", () => {
  const mockGetUserById = jest.fn();
  const mockPatchUser = jest.fn();
  const mockPush = jest.fn();

  const mockHookReturn = {
    ready: true,
    getUserById: mockGetUserById,
    patchUser: mockPatchUser,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    mockGetUserById.mockResolvedValue(mockUser);
    mockPatchUser.mockResolvedValue(undefined);

    (useIndexedDBUsers as jest.Mock).mockReturnValue(mockHookReturn);
    (useParams as jest.Mock).mockReturnValue({ id: "1" });
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it("renders loading overlay while fetching user", async () => {
    render(
      <MantineProvider>
        <UserDetailPage />
      </MantineProvider>
    );

    // Loading overlay should be visible initially
    const loaderElements = screen.getAllByRole("generic");
    const loaderExists = loaderElements.some(
      (el) => el.className && el.className.includes("LoadingOverlay")
    );
    expect(loaderExists).toBe(true);

    await waitFor(() => {
      expect(screen.getByText("User Details")).toBeInTheDocument();
    });
  });

  it("renders user details correctly after fetching", async () => {
    render(
      <MantineProvider>
        <UserDetailPage />
      </MantineProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("User Details")).toBeInTheDocument();
    });

    // Check if user information is displayed
    expect(screen.getAllByText("John Doe").length).toBeGreaterThan(0);
    expect(screen.getByText("LSQ-12345")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
    expect(screen.getByText("₦200,000.00")).toBeInTheDocument();
    expect(screen.getByText("9876543210/Providus Bank")).toBeInTheDocument();
    expect(screen.getByText("07011112222")).toBeInTheDocument();
  });

  it("calls getUserById with the correct user ID from params", async () => {
    render(
      <MantineProvider>
        <UserDetailPage />
      </MantineProvider>
    );

    await waitFor(() => {
      expect(mockGetUserById).toHaveBeenCalledWith("1");
    });
  });

  it("shows notification and redirects when user is not found", async () => {
    mockGetUserById.mockResolvedValueOnce(null);

    render(
      <MantineProvider>
        <UserDetailPage />
      </MantineProvider>
    );

    await waitFor(() => {
      expect(notifications.show).toHaveBeenCalledWith({
        title: "User not found",
        message: "Please check the user id",
        color: "red",
      });
      expect(mockPush).toHaveBeenCalledWith("/dashboard/users");
    });
  });

  it("shows error notification and redirects when getUserById throws error", async () => {
    const error = new Error("Database error");
    mockGetUserById.mockRejectedValueOnce(error);

    render(
      <MantineProvider>
        <UserDetailPage />
      </MantineProvider>
    );

    await waitFor(() => {
      expect(notifications.show).toHaveBeenCalledWith({
        title: "User not found",
        message: error.toString(),
        color: "red",
      });
      expect(mockPush).toHaveBeenCalledWith("/dashboard/users");
    });
  });

  it("blacklists user when blacklist button is clicked", async () => {
    render(
      <MantineProvider>
        <UserDetailPage />
      </MantineProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("User Details")).toBeInTheDocument();
    });

    const blacklistButton = screen.getByText("Blacklist User");
    fireEvent.click(blacklistButton);

    // Wait for confirmation modal to appear
    await waitFor(() => {
      expect(screen.getByText("Are you sure?")).toBeInTheDocument();
    });

    // Click confirm button in modal
    const confirmButton = screen.getByRole("button", { name: /confirm/i });
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(mockPatchUser).toHaveBeenCalledWith("1", {
        status: USER_STATUS_E.BLACKLISTED,
      });
    });
  });

  it("activates user when activate button is clicked", async () => {
    const blacklistedUser = {
      ...mockUser,
      status: USER_STATUS_E.BLACKLISTED,
    };
    mockGetUserById.mockResolvedValueOnce(blacklistedUser);

    render(
      <MantineProvider>
        <UserDetailPage />
      </MantineProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("User Details")).toBeInTheDocument();
    });

    const activateButton = screen.getByText("Active User");
    fireEvent.click(activateButton);

    // Wait for confirmation modal to appear
    await waitFor(() => {
      expect(screen.getByText("Are you sure?")).toBeInTheDocument();
    });

    // Click confirm button in modal
    const confirmButton = screen.getByRole("button", { name: /confirm/i });
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(mockPatchUser).toHaveBeenCalledWith("1", {
        status: USER_STATUS_E.ACTIVE,
      });
    });
  });

  it("does not show blacklist button when user is already blacklisted", async () => {
    const blacklistedUser = {
      ...mockUser,
      status: USER_STATUS_E.BLACKLISTED,
    };
    mockGetUserById.mockResolvedValueOnce(blacklistedUser);

    render(
      <MantineProvider>
        <UserDetailPage />
      </MantineProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("User Details")).toBeInTheDocument();
    });

    expect(screen.queryByText("Blacklist User")).not.toBeInTheDocument();
    // Activate button should be present
    expect(screen.getByText("Active User")).toBeInTheDocument();
  });

  it("does not show activate button when user is already active", async () => {
    render(
      <MantineProvider>
        <UserDetailPage />
      </MantineProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("User Details")).toBeInTheDocument();
    });

    expect(screen.queryByText("Active User")).not.toBeInTheDocument();
    // Blacklist button should be present
    expect(screen.getByText("Blacklist User")).toBeInTheDocument();
  });

  it("renders all sections when user data is loaded", async () => {
    render(
      <MantineProvider>
        <UserDetailPage />
      </MantineProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("User Details")).toBeInTheDocument();
      expect(screen.getByText("Back to Users")).toBeInTheDocument();
      expect(screen.getByText("General Details")).toBeInTheDocument();
      expect(screen.getByText("personal information")).toBeInTheDocument();
      expect(screen.getByText("education and employment")).toBeInTheDocument();
    });
  });

  it("does not render user sections while loading", () => {
    render(
      <MantineProvider>
        <UserDetailPage />
      </MantineProvider>
    );

    // Sections should not be visible during loading
    expect(screen.queryByText("Back to Users")).not.toBeInTheDocument();
    expect(screen.queryByText("General Details")).not.toBeInTheDocument();
  });

  it("waits for IndexedDB to be ready before fetching user", async () => {
    (useIndexedDBUsers as jest.Mock).mockReturnValue({
      ...mockHookReturn,
      ready: false,
    });

    render(
      <MantineProvider>
        <UserDetailPage />
      </MantineProvider>
    );

    // getUserById should not be called when ready is false
    expect(mockGetUserById).not.toHaveBeenCalled();
  });
});

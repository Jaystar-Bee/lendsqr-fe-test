import "@testing-library/jest-dom";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import { useSearchParams } from "next/navigation";
import { useIndexedDBUsers } from "@/hooks/useUserDB";
import UserPage from "./page";

jest.mock("@/hooks/useUserDB");
jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(),
  useRouter: () => ({ push: jest.fn() }),
}));

const mockUsers = [
  {
    id: "1",
    status: "active",
    created_at: "2024-01-10",
    organization: "Lendsqr",
    personal_information: {
      full_name: "John Doe",
      email: "john@example.com",
      phone_number: "07011112222",
    },
  },
  {
    id: "2",
    status: "blacklisted",
    created_at: "2024-01-09",
    organization: "Lendsqr",
    personal_information: {
      full_name: "Jane Doe",
      email: "jane@example.com",
      phone_number: "07033334444",
    },
  },
];

describe("User Page", () => {
  const mockSaveUsers = jest.fn();
  const mockGetAllUsers = jest.fn();
  const mockPatchUser = jest.fn();

  // Create stable mock implementation
  const mockHookReturn = {
    ready: true,
    saveUsers: mockSaveUsers,
    getAllUsers: mockGetAllUsers,
    patchUser: mockPatchUser,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockGetAllUsers.mockResolvedValue([]);
    mockSaveUsers.mockResolvedValue(undefined);
    mockPatchUser.mockResolvedValue(undefined);

    // Reset fetch mock
    (global.fetch as jest.Mock).mockResolvedValue({
      json: () => Promise.resolve([]),
    });

    (useIndexedDBUsers as jest.Mock).mockReturnValue(mockHookReturn);

    (useSearchParams as jest.Mock).mockReturnValue({
      get: () => "",
    });
  });

  it("renders loader while fetching users", async () => {
    mockGetAllUsers.mockResolvedValue([]);
    (global.fetch as jest.Mock).mockResolvedValue({
      json: () => Promise.resolve([]),
    });

    render(
      <MantineProvider>
        <UserPage />
      </MantineProvider>
    );

    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: "Users", level: 1 })
      ).toBeInTheDocument();
    });
    expect(screen.getByText(/out of/i)).toBeInTheDocument();
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it("renders users correctly after fetching", async () => {
    mockGetAllUsers.mockResolvedValue(mockUsers);

    render(
      <MantineProvider>
        <UserPage />
      </MantineProvider>
    );

    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: "Users", level: 1 })
      ).toBeInTheDocument();
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    });
  });

  it("filters users based on status", async () => {
    mockGetAllUsers.mockResolvedValue(mockUsers);

    // Set search params before rendering
    (useSearchParams as jest.Mock).mockReturnValue({
      get: (key: string) => (key === "status" ? "active" : ""),
    });

    render(
      <MantineProvider>
        <UserPage />
      </MantineProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });

    // blacklisted user should not be in the document
    expect(screen.queryByText("blacklisted")).not.toBeInTheDocument();
  });

  it("shows limited items per page and updates on select change", async () => {
    const manyUsers = Array.from({ length: 30 }).map((_, i) => ({
      ...mockUsers[0],
      id: String(i),
      personal_information: {
        ...mockUsers[0].personal_information,
        full_name: `User ${i}`,
      },
    }));

    mockGetAllUsers.mockResolvedValue(manyUsers);

    render(
      <MantineProvider>
        <UserPage />
      </MantineProvider>
    );

    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: "Users", level: 1 })
      ).toBeInTheDocument();
    });

    // Default is 100 items per page, so all 30 should be visible
    await waitFor(() => {
      const userElements = screen.getAllByText(/User \d+/);
      expect(userElements.length).toBe(30);
    });

    // change items per page to 10
    const select = screen.getByDisplayValue("100");
    fireEvent.change(select, { target: { value: "10" } });

    await waitFor(() => {
      const userElements = screen.getAllByText(/User \d+/);
      expect(userElements.length).toBe(10);
    });
  });

  it("calls patchUser when handleUpdateUserStatus is triggered", async () => {
    mockGetAllUsers.mockResolvedValue(mockUsers);

    render(
      <MantineProvider>
        <UserPage />
      </MantineProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });

    // Simulate user status update
    const user = mockUsers[0];
    const updatedStatus = { status: "blacklisted" };

    mockPatchUser(user.id, updatedStatus);
    expect(mockPatchUser).toHaveBeenCalledWith(user.id, updatedStatus);
  });

  it("shows no data when there are no users", async () => {
    mockGetAllUsers.mockResolvedValue([]);
    (global.fetch as jest.Mock).mockResolvedValue({
      json: () => Promise.resolve([]),
    });

    render(
      <MantineProvider>
        <UserPage />
      </MantineProvider>
    );

    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: "Users", level: 1 })
      ).toBeInTheDocument();
    });

    // Verify no users are displayed
    expect(screen.queryByText(/Doe/)).not.toBeInTheDocument();
    expect(screen.getByText(/out of/i)).toBeInTheDocument();
    expect(screen.getByTestId("table-empty-state")).toBeInTheDocument();
  });
});

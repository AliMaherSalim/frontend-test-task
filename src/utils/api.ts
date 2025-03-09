import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081";

export interface NavItem {
  id: number;
  title: string;
  target: string;
  visible?: boolean;
  children?: NavItem[];
}

// ✅ Fetch navigation items
export const getNavigation = async (): Promise<NavItem[]> => {
  try {
    const response = await axios.get(`${API_URL}/nav`);
    return response.data;
  } catch (error) {
    console.error("Error fetching navigation:", error);
    throw error;
  }
};

// ✅ Save updated navigation
export const saveNavigation = async (items: NavItem[]): Promise<void> => {
  try {
    await axios.post(`${API_URL}/nav`, items);
  } catch (error) {
    console.error("Error saving navigation:", error);
    throw error;
  }
};

// ✅ Track reorder action
export const trackReorder = async (
  id: number,
  from: number,
  to: number
): Promise<void> => {
  try {
    await axios.post(`${API_URL}/track`, { id, from, to });
  } catch (error) {
    console.error("Error tracking reorder:", error);
  }
};
export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  postedDate: string;
  experience: string;
  employmentType: string;
  mode: string;
  category: string;
  logo: string;
}

export const getJobs = async (): Promise<Job[]> => {
  const response = await axios.get(`${API_URL}/jobs`);
  return response.data;
};

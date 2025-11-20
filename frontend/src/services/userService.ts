import client from "../apollo";
import { GET_USERS_SELECT } from "../graphql/queries/users";
import { type UserSelectItem } from "../types/User";

/**
 * Service object for interacting with user-related API functionality.
 * Provides functions to fetch users for UI components.
 *
 * @namespace userService
 */
export const userService = {
  /**
   * Retrieves a list of users for select menus, returning only user IDs and names.
   *
   * @async
   * @function getUsersSelect
   * @memberof userService
   * @returns {Promise<Array<UserSelectItem>>} Resolves to an array of users formatted for selection menus.
   * @throws {Error} Throws if unable to fetch the list of users.
   */
  getUsersSelect: async (): Promise<Array<UserSelectItem>> => {
    try {
      const { data } = await client.query<{
        users: Array<UserSelectItem>;
      }>({
        query: GET_USERS_SELECT,
        fetchPolicy: "network-only",
      });
      return data?.users ?? [];
    } catch (error) {
      console.error("Failed to get user list for select:", error);
      throw error;
    }
  },
};

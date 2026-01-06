import Geolocation from "react-native-geolocation-service";
import { PermissionsAndroid } from "react-native";
import { parse, format } from "date-fns";
import AsyncStorage from "@react-native-async-storage/async-storage";

class Utilities {
  /** Get current date + time in UTC (ISO format) */
  static getCurrentDateAndTimeInUTC(): string {
    return new Date().toISOString();
  }

  /** Get only the date (YYYY-MM-DD) in UTC */
  static getCurrentDateOnlyAndTimeInUTC(): string {
    return new Date().toISOString().split("T")[0];
  }

  /** Get device timezone */
  static getCurrentTimeZone(): string {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }

  /** BEGIN or END of day in UTC (00:00:00 or 23:59:59.999) */
  static getDateAndTimeInUTC(trigger: "BEGIN" | "END"): string {
    const now = new Date();
    const dateOnly = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));

    if (trigger === "BEGIN") {
      dateOnly.setUTCHours(0, 0, 0, 0);
    } else {
      dateOnly.setUTCHours(23, 59, 59, 999);
    }

    return dateOnly.toISOString();
  }

  /** Compares dates and returns interval type */
  static calculateDateInterval(currentDateTime: string, beginDate: string, endDate: string): number {
    const toLocal = (utc: string) => {
      const d = new Date(utc);
      return new Date(
        d.getUTCFullYear(),
        d.getUTCMonth(),
        d.getUTCDate(),
        d.getUTCHours(),
        d.getUTCMinutes(),
        d.getUTCSeconds()
      );
    };

    const current = toLocal(currentDateTime);
    const start = toLocal(beginDate);
    const end = toLocal(endDate);

    const isSameDay = (d1: Date, d2: Date) =>
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();

    const allSameDate = isSameDay(current, start) && isSameDay(current, end);

    if (current.getTime() < start.getTime()) return 1;
    if (current.getTime() > end.getTime() && !allSameDate) return -1;
    if (current.getTime() >= start.getTime() && current.getTime() <= end.getTime()) return 0;

    return 0;
  }

  /** Convert local time → UTC formatted string */
  static getlocalToUTCTime(localDateStr: string): string {
    const local = new Date(localDateStr);
    const utc = new Date(local.getTime() - local.getTimezoneOffset() * 60000);

    return utc.toISOString().replace("T", " ").substring(0, 19);
  }


  
  /** Format date for display */
  static displayDateFormat(inputDate: string): string {
    try {
      const parsed = parse(inputDate, "yyyy-MM-dd HH:mm:ss", new Date());
      return format(parsed, "dd-MM-yyyy hh:mm a");
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid date";
    }
  }

  /** Merge goals from API + local storage but avoid duplicates */
  static async getCombinedGoals(futureGoals: any[]) {
    const json = await AsyncStorage.getItem("@user_goals");
    const userGoals = json ? JSON.parse(json) : [];

    const map = new Map();
    [...userGoals, ...futureGoals].forEach((g) => map.set(g.id, g));

    return Array.from(map.values());
  }

  /** Get coordinates (Fix: call Utils.requestLocationPermission) */
  static async getCoordinates() {
    const hasPermission = await Utils.requestLocationPermission();

    if (hasPermission) {
      Geolocation.getCurrentPosition(
        (position) => console.log("Position:", position),
        (error) => console.error("Geolocation error:", error),
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    } else {
      console.log("Geolocation permission denied");
    }
  }

  /** Request location permission */
  static async requestLocationPermission(): Promise<boolean> {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Geolocation Permission",
          message: "Can we access your location?",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );

      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.error("Permission request error:", err);
      return false;
    }
  }

  /** Get server API URL or fallback to default config */
//   static async getServerAPI(endpoint?: string): Promise<string | null> {
//     try {
//       let baseURL = await AsyncStorage.getItem(Constants.PREF_KEY_APP_SERVER_API_BASE_URL);

//       if (!baseURL) {
//         baseURL = Config.apiUrl.APP_SERVER_API_BASE_URL;
//         await AsyncStorage.setItem(Constants.PREF_KEY_APP_SERVER_API_BASE_URL, baseURL);
//       }

//       if (endpoint && endpoint.trim() !== "") {
//         return `${baseURL}/${endpoint}`.trim();
//       }

//       return baseURL.trim();
//     } catch (error) {
//       console.error("Error getting server API URL:", error);
//       return null;
//     }
//   }
}

export default Utilities;

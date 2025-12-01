//Model calling , Error Handling,Loading stuffs for Splash Screen

import { useEffect, useState } from "react";
import { fetchVersionInfo, VersionInfo } from "./SplashModal";

export const useSplashController = (navigation: any) => {
  const [versionData, setVersionData] = useState<VersionInfo>({
    versionCode: null,
    versionString: null,
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setErrorMsg(null);

    try {
      const data = await fetchVersionInfo();
      setVersionData(data);

      if (!data.versionCode) {
        setErrorMsg("Failed to fetch version info.");
      }

    } catch (err) {
      setErrorMsg("Error fetching data.");
    } finally {
      setLoading(false);

      setTimeout(() => {
        navigation.replace("Welcome");
      }, 3000);
    }
  };

  return {
    loading,
    errorMsg,
    versionData,
  };
};

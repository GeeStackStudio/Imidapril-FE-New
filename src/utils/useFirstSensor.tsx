import { useOpenApiFpRequest } from "../Http/useOpenApiRequest";
import { Sensor, SensorApi } from "../scaffold";
import { useMount } from "ahooks";
import { useState } from "react";

export function useFirstSensor() {
  const [sensor, setSensor] = useState<Sensor>();
  const sensorSearchHook = useOpenApiFpRequest(
    SensorApi,
    SensorApi.prototype.sensorSearchGet
  );
  async function search() {
    const r = await sensorSearchHook.request({
      pi: 1,
      ps: 1,
    });
    if (r.list?.length || 0 > 0) {
      const i = r.list?.at(0);
      setSensor(i);
      return i;
    }
  }
  return {
    search,
    sensor,
  };
}

"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import * as L from "leaflet";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";

export type Coordinates = { lat: number; lng: number };

function clampPrecision(n: number) {
  return Number.isFinite(n) ? Number(n.toFixed(6)) : n;
}

function Recenter({ center }: { center: Coordinates }) {
  const map = useMap();
  useEffect(() => {
    map.setView([center.lat, center.lng], map.getZoom(), { animate: true });
  }, [map, center.lat, center.lng]);
  return null;
}

function ClickToPick({ onPick }: { onPick: (c: Coordinates) => void }) {
  useMapEvents({
    click(e) {
      onPick({ lat: clampPrecision(e.latlng.lat), lng: clampPrecision(e.latlng.lng) });
    },
  });
  return null;
}

export function MapPicker({
  center,
  value,
  onChange,
  labels,
}: {
  center: Coordinates;
  value: Coordinates | null;
  onChange: (c: Coordinates | null) => void;
  labels: {
    tapToDropPin: string;
    useMyLocation: string;
    clearPin: string;
    locationSelected: (lat: number, lng: number) => string;
    gettingLocation: string;
    locationUnavailable: string;
  };
}) {
  const icon = useMemo(
    () =>
      L.divIcon({
        className: "fueldrop-pin",
        html: `
          <div style="
            width: 18px;
            height: 18px;
            border-radius: 9999px;
            background: #0ea5e9;
            border: 3px solid rgba(255,255,255,.95);
            box-shadow: 0 10px 22px rgba(15,23,42,.18);
          "></div>
        `,
        iconSize: [18, 18],
        iconAnchor: [9, 9],
      }),
    []
  );
  const [geoBusy, setGeoBusy] = useState(false);

  const pick = useCallback(
    (c: Coordinates) => {
      onChange(c);
    },
    [onChange]
  );

  const useMyLocation = async () => {
    if (!navigator?.geolocation) {
      // eslint-disable-next-line no-alert
      alert(labels.locationUnavailable);
      return;
    }
    setGeoBusy(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        pick({
          lat: clampPrecision(pos.coords.latitude),
          lng: clampPrecision(pos.coords.longitude),
        });
        setGeoBusy(false);
      },
      () => {
        setGeoBusy(false);
        // eslint-disable-next-line no-alert
        alert(labels.locationUnavailable);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  return (
    <div className="space-y-3">
      <p className="text-sm text-slate-600">{labels.tapToDropPin}</p>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
        <MapContainer
          center={[center.lat, center.lng]}
          zoom={12}
          scrollWheelZoom={false}
          className="h-[280px] w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Recenter center={center} />
          <ClickToPick onPick={pick} />
          {value && <Marker position={[value.lat, value.lng]} icon={icon} />}
        </MapContainer>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-slate-600">
          {value ? (
            <span className="font-medium text-slate-900">
              {labels.locationSelected(value.lat, value.lng)}
            </span>
          ) : (
            <span className="text-slate-500">—</span>
          )}
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={useMyLocation}
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-500 disabled:opacity-60"
            disabled={geoBusy}
          >
            {geoBusy ? labels.gettingLocation : labels.useMyLocation}
          </button>
          <button
            type="button"
            onClick={() => onChange(null)}
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            {labels.clearPin}
          </button>
        </div>
      </div>
    </div>
  );
}


import { useCallback, useRef, useState } from 'react';

/**
 * Drives the caller app's screen flow:
 *
 *   select   -> service + language chosen, ready to call
 *   permissions -> requesting mic + GPS
 *   ready    -> permissions granted, big call button shown
 *   calling  -> "Placing call…" transitional state
 *   active   -> live call, first-aid guidance playing
 *   ended    -> call finished/cancelled
 *
 * BACKEND TODO: replace the `calling` timeout simulation below with a
 * real call-setup request. When the backend assigns a call_id, store it
 * here so it can be attached to the audio stream and any later API
 * calls (e.g. cancel, end, status poll).
 */
export function useCallFlow() {
  const [stage, setStage] = useState('select');
  const [service, setService] = useState(null);
  const [language, setLanguage] = useState(null);
  const [micGranted, setMicGranted] = useState(false);
  const [locationGranted, setLocationGranted] = useState(false);
  const [coords, setCoords] = useState(null);
  const [permissionError, setPermissionError] = useState(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const timerRef = useRef(null);
  const callingTimeoutRef = useRef(null);

  const requestPermissions = useCallback(async () => {
    setStage('permissions');
    setPermissionError(null);

    // Microphone permission
    try {
      // BACKEND TODO: once granted, the MediaStream returned here is what
      // should be piped to Amazon Transcribe / Khaya AI via the call
      // audio-streaming endpoint (likely over the WebSocket / Kinesis
      // ingestion path described in the architecture doc).
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicGranted(true);
      // Stop the test stream immediately — we only needed the permission
      // grant right now, not a live stream yet.
      stream.getTracks().forEach((track) => track.stop());
    } catch (err) {
      setPermissionError('mic');
      setStage('select');
      return;
    }

    // Location permission
    try {
      await new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
          reject(new Error('Geolocation not supported'));
          return;
        }
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            setLocationGranted(true);
            setCoords({
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            });
            resolve();
          },
          (err) => reject(err),
          { enableHighAccuracy: true, timeout: 10000 }
        );
      });
    } catch (err) {
      setPermissionError('location');
      setStage('select');
      return;
    }

    setStage('ready');
  }, []);

  const placeCall = useCallback(() => {
    setStage('calling');

    // BACKEND TODO: replace this simulated delay with the real call-init
    // request, e.g.:
    //   POST /calls  { service, language, coords }
    //   -> { call_id, websocket_url }
    // Then open the WebSocket / audio stream using that call_id before
    // moving to the "active" stage.
    callingTimeoutRef.current = setTimeout(() => {
      setStage('active');
      setElapsedSeconds(0);
      timerRef.current = setInterval(() => {
        setElapsedSeconds((s) => s + 1);
      }, 1000);
    }, 1800);
  }, []);

  const cancelCall = useCallback(() => {
    clearTimeout(callingTimeoutRef.current);
    clearInterval(timerRef.current);
    setStage('ready');
  }, []);

  const endCall = useCallback(() => {
    clearInterval(timerRef.current);
    // BACKEND TODO: notify backend the call ended, e.g. POST /calls/:id/end
    setStage('ended');
  }, []);

  const reset = useCallback(() => {
    clearInterval(timerRef.current);
    clearTimeout(callingTimeoutRef.current);
    setStage('select');
    setService(null);
    setLanguage(null);
    setElapsedSeconds(0);
  }, []);

  return {
    stage,
    service,
    setService,
    language,
    setLanguage,
    micGranted,
    locationGranted,
    coords,
    permissionError,
    elapsedSeconds,
    requestPermissions,
    placeCall,
    cancelCall,
    endCall,
    reset,
  };
}

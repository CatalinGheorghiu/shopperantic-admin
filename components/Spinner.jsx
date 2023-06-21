import { PulseLoader } from 'react-spinners';

export default function Spinner({ fullWidth }) {
  if (fullWidth) {
    return (
      <div className="flex w-full justify-center">
        <PulseLoader color={'#1E3A8A'} speedMultiplier={1} />
      </div>
    );
  }
  return <PulseLoader color={'#1E3A8A'} speedMultiplier={1} />;
}

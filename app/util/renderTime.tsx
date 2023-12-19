const renderTime = ({ remainingTime }: { remainingTime: number }) => {
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
  function str_pad_left(string: string, pad: string, length: number) {
    return (new Array(length + 1).join(pad) + string).slice(-length);
  }

  const finalTime =
    str_pad_left(minutes.toString(), "0", 2) +
    ":" +
    str_pad_left(seconds.toString(), "0", 2);

  return (
    <div className="timer">
      <div className="text-6xl font-semibold">{finalTime}</div>
    </div>
  );
};

export default renderTime;

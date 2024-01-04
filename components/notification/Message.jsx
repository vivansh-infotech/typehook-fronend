const processMessage = (messages) => {
  let _messages = [];
  if (
    typeof messages === "object" &&
    !Array.isArray(messages) &&
    messages !== null
  ) {
    for (const key in messages) {
      let _msg = messages[key];
      if (Array.isArray(_msg)) {
        _messages = _messages.concat(_msg);
      } else {
        _messages.push(_msg);
      }
    }
  } else if (Array.isArray(messages)) {
    _messages.concat(messages);
  } else {
    _messages.push(messages);
  }

  return _messages;
};

export const Message = ({ message, type }) => {
  const _messages = processMessage(message);
  if (_messages) {
    if (_messages.length === 1) {
      return (
        <>
          <p>{_messages[0]}</p>
        </>
      );
    } else {
      return (
        <ul>
          {_messages.map((item, index) => (
            <li key={`error${index}`}>{item}</li>
          ))}
        </ul>
      );
    }
  } else {
    if (type === "error") {
      return (
        <>
          <p>Something went wrong</p>
        </>
      );
    } else {
      return <></>;
    }
  }
};

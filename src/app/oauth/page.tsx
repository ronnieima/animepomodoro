import React from "react";

type CallbackParams = {
  code: string;
  state: string;
};

export default function AuthCallbackPage(searchParams: CallbackParams) {
  console.log(searchParams);
  return <div>Authenticated Successfully!</div>;
}

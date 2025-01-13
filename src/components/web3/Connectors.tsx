"use client"
import * as React from 'react'
import { Connector, useConnect } from 'wagmi'

export function ConnectToMetamask() {
  const { connectors, connect } = useConnect()

  return connectors
    .filter(conn => conn.id === "injected")
    .map((connector) => (
    <button key={connector.uid} onClick={() => connect({ connector })} type='button' className="mt-5 px-4 py-2 text-white bg-slate-700 rounded-lg hover:bg-purple-800 cursor-pointer my-2 ">
        Connect Wallet
    </button>
    // <button key={connector.uid} onClick={() => connect({ connector })}>
    //     {connector.name}
    // </button>
  ))
}
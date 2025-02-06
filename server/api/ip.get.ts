import { defineEventHandler } from 'h3'
import { networkInterfaces } from 'os'

export default defineEventHandler(() => {
  const nets = networkInterfaces()
  const results: string[] = []

  for (const name of Object.keys(nets)) {
    const interfaces = nets[name]
    if (!interfaces) continue

    for (const net of interfaces) {
      // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
      if (net.family === 'IPv4' && !net.internal) {
        results.push(net.address)
      }
    }
  }

  return {
    addresses: results,
    // Return first non-internal IPv4 address as primary
    primary: results[0] || 'unknown',
    timestamp: new Date().toISOString()
  }
}) 
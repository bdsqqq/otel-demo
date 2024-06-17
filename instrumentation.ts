import { NodeSDK } from '@opentelemetry/sdk-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { Resource } from '@opentelemetry/resources';
import { SEMRESATTRS_SERVICE_NAME } from '@opentelemetry/semantic-conventions';
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-node';

export function register() {
  const sdk = new NodeSDK({
    resource: new Resource({
      [SEMRESATTRS_SERVICE_NAME]: 'nextjs-app',
    }),
    spanProcessor: new SimpleSpanProcessor(
      new OTLPTraceExporter({
        url: 'https://api.axiom.co/v1/traces',
        headers: {
          Authorization: `Bearer ${process.env.API_TOKEN}`,
          'X-Axiom-Dataset': process.env.DATASET_NAME,
        },
      })
    ),
  });

  sdk.start();
}
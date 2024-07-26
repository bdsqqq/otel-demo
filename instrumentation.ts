import { NodeSDK } from '@opentelemetry/sdk-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { Resource } from '@opentelemetry/resources';
import { SEMRESATTRS_SERVICE_NAME } from '@opentelemetry/semantic-conventions';
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-node';

export function register() {
    console.log('Registering OpenTelemetry...'); 

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
              }
        }))
    });

    try {
        sdk.start();
        console.log('OpenTelemetry registered successfully.'); 
    } catch (error) {
        console.error('Failed to register OpenTelemetry:', error);
    }
}

// import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
// import { SimpleSpanProcessor } from "@opentelemetry/sdk-trace-node";
// import { registerOTel } from "@vercel/otel";

// export function register() {
// 	registerOTel({
// 		serviceName: "nextjs-app",
// 		spanProcessors: [
// 			new SimpleSpanProcessor(
// 				new OTLPTraceExporter({
// 					url: "https://api.axiom.co/v1/traces",
// 					headers: {
// 						"Authorization": `Bearer ${process.env.API_TOKEN}`,
// 						"X-Axiom-Dataset": `${process.env.DATASET_NAME}`,
// 					},
// 				}),
// 			),
// 		],
// 	});
// }

// import { NodeSDK } from '@opentelemetry/sdk-node';
// import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
// import { Resource } from '@opentelemetry/resources';
// import { SEMRESATTRS_SERVICE_NAME } from '@opentelemetry/semantic-conventions';
// import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-node';

// export function register() {
//   const sdk = new NodeSDK({
//     resource: new Resource({
//       [SEMRESATTRS_SERVICE_NAME]: 'nextjs-app',
//     }),
//     spanProcessor: new SimpleSpanProcessor(
//       new OTLPTraceExporter({
//         url: 'https://api.axiom.co/v1/traces',
//         headers: {
//           Authorization: `Bearer ${process.env.API_TOKEN}`,
//           'X-Axiom-Dataset': process.env.DATASET_NAME,
//         },
//       })
//     ),
//   });

//   sdk.start();
// }
import { Injectable } from '@nestjs/common';
import { Consumer, Kafka, Producer } from 'kafkajs';

@Injectable()
export class KafkaService {
    private kafka = new Kafka({
        brokers: ['localhost:9092'],
    });

    producer(): Producer {
        return this.kafka.producer();
    }

    consumer(groupId: string): Consumer {
        return this.kafka.consumer({ groupId });
    }
}

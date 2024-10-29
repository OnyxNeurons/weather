import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  RabbitSubscribe,
  RabbitRPC,
  AmqpConnection,
} from '@golevelup/nestjs-rabbitmq';
import { readFileSync } from 'fs';

@Injectable()
export class EventsService implements OnModuleInit {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @RabbitSubscribe({
    exchange: 'neuron.events',
    routingKey: 'user.connected',
    queue: 'weather_user_events',
  })
  async handleUserConnected(data: any) {
    console.log('User connected in weather neuron:', data);
  }

  @RabbitRPC({
    exchange: 'neuron.events',
    routingKey: 'weather.current',
    queue: 'weather_current_requests',
  })
  async handleCurrentWeather(data: any) {
    return {
      temperature: 22,
      condition: 'sunny',
      humidity: 65,
      location: 'Paris',
    };
  }

  @RabbitRPC({
    exchange: 'neuron.events',
    routingKey: 'weather.forecast',
    queue: 'weather_forecast_requests',
  })
  async handleForecast(data: any) {
    return {
      daily: [
        { day: 'Monday', temp: 22, condition: 'sunny' },
        { day: 'Tuesday', temp: 20, condition: 'cloudy' },
        { day: 'Wednesday', temp: 18, condition: 'rainy' },
      ],
    };
  }

  async onModuleInit() {
    // Wait for connection to be established
    this.amqpConnection.managedConnection.on('connect', async () => {
      try {
        const manifest = JSON.parse(readFileSync('/manifest.json', 'utf-8'));
        await this.amqpConnection.publish('neuron.events', 'neuron.discovery', {
          manifest,
          timestamp: new Date(),
        });
        console.log('Discovery event emitted successfully');
      } catch (error) {
        console.error('Failed to emit discovery event:', error);
      }
    });
  }
}

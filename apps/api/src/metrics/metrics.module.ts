import { Module, Controller, Get } from '@nestjs/common';
import { Registry, collectDefaultMetrics, register } from 'prom-client';

@Controller('metrics')
class MetricsController {
constructor() {
// collect default node metrics
collectDefaultMetrics();
}

@Get()
async metrics() {
return register.metrics();
}
}

@Module({
controllers: [MetricsController],
})
export class MetricsModule {}
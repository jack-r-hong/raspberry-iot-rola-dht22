import 'dart:html';

import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:app/home/index.dart';
import 'package:flutter_bootstrap/flutter_bootstrap.dart';
import 'package:syncfusion_flutter_charts/charts.dart';
import 'package:syncfusion_flutter_charts/sparkcharts.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({
    required HomeBloc homeBloc,
    Key? key,
  })  : _homeBloc = homeBloc,
        super(key: key);

  final HomeBloc _homeBloc;

  @override
  HomeScreenState createState() {
    return HomeScreenState();
  }
}

class HomeScreenState extends State<HomeScreen> {
  HomeScreenState();

  @override
  void initState() {
    super.initState();
    _load();
  }

  @override
  void dispose() {
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    List<_SensorData> tempData = [
      _SensorData('20:20', 35),
      _SensorData('20:22', 28),
      _SensorData('20:23', 34),
      _SensorData('20:24', 32),
      _SensorData('20:25', 40)
    ];
    List<_SensorData> humiData = [
      _SensorData('20:20', 35),
      _SensorData('20:22', 28),
      _SensorData('20:23', 34),
      _SensorData('20:24', 32),
      _SensorData('20:25', 40)
    ];
    return BlocBuilder<HomeBloc, HomeState>(
        bloc: widget._homeBloc,
        builder: (
          BuildContext context,
          HomeState currentState,
        ) {
          return BootstrapContainer(
            children: [
              BootstrapRow(children: [
                BootstrapCol(
                  child: Center(child: Text("dht22 sensor")),
                  sizes: 'col-12',
                )
              ]),
              BootstrapRow(children: [
                BootstrapCol(
                    child: Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: Text("溫度: 40.2"),
                    ),
                    sizes: 'col-5',
                    offsets: 'offset-1'),
                BootstrapCol(
                    child: Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: Text("溼度: 40.2"),
                    ),
                    sizes: 'col-5 ',
                    offsets: 'offset-1'),
              ]),
              BootstrapRow(children: [
                BootstrapCol(
                  child: SfCartesianChart(
                      primaryXAxis: CategoryAxis(),
                      // Chart title
                      title: ChartTitle(text: '溫濕度圖表'),
                      // Enable legend
                      legend: Legend(isVisible: true),
                      // Enable tooltip
                      tooltipBehavior: TooltipBehavior(enable: true),
                      series: <ChartSeries<_SensorData, String>>[
                        LineSeries<_SensorData, String>(
                            dataSource: tempData,
                            xValueMapper: (_SensorData d, _) => d.time,
                            yValueMapper: (_SensorData d, _) => d.value,
                            name: '溫度',
                            // Enable data label
                            dataLabelSettings:
                                DataLabelSettings(isVisible: true)),
                        LineSeries<_SensorData, String>(
                            dataSource: humiData,
                            xValueMapper: (_SensorData d, _) => d.time,
                            yValueMapper: (_SensorData d, _) => d.value,
                            name: '溼度',
                            // Enable data label
                            dataLabelSettings:
                                DataLabelSettings(isVisible: true)),
                      ]),
                )
              ]),
            ],
          );
        });
  }

  void _load() {
    widget._homeBloc.add(LoadHomeEvent());
  }
}

class _SensorData {
  _SensorData(this.time, this.value);

  final String time;
  final double value;
}

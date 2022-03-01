import 'package:app/you_awesome/index.dart';

class YouAwesomeRepository {
  final YouAwesomeProvider _youAwesomeProvider = YouAwesomeProvider();

  YouAwesomeRepository();

  void test(bool isError) {
    _youAwesomeProvider.test(isError);
  }
}
import 'package:app/main/index.dart';

class MainRepository {
  final MainProvider _mainProvider = MainProvider();

  MainRepository();

  void test(bool isError) {
    _mainProvider.test(isError);
  }
}

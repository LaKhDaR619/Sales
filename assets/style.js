import Colors from './Colors';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 40,
    backgroundColor: '#1b262c',
    flexDirection: 'row',
  },
  text: {
    flex: 4,
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  row: {
    flexDirection: 'row',
    backgroundColor: '#0f4c75',
    minHeight: 30,
    maxHeight: 35,
    alignItems: 'center',
    overflow: 'hidden',
  },
});

export default styles;

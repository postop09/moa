import DateTimePicker, {
  type DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import { Colors } from '@/shared/config';
import { useColorScheme } from '@/shared/lib';
import { ThemedText } from '@/shared/ui';
import { formatDisplayDate } from '../lib/date';
type DateFieldProps = {
  value: Date;
  onChange: (date: Date) => void;
};
export const DateField = ({ value, onChange }: DateFieldProps) => {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const [showPicker, setShowPicker] = useState(false);
  const handleChange = (_event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowPicker(false);
    }
    if (selectedDate) {
      onChange(selectedDate);
    }
  };
  return (
    <View style={styles.container}>
      <ThemedText style={styles.label}>날짜</ThemedText>
      <Pressable
        onPress={() => setShowPicker(true)}
        style={[
          styles.field,
          { borderColor: colors.border, backgroundColor: colors.card },
        ]}
      >
        <ThemedText style={styles.value}>{formatDisplayDate(value)}</ThemedText>
      </Pressable>

      {showPicker ? (
        <DateTimePicker
          value={value}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleChange}
          locale="ko-KR"
        />
      ) : null}

      {Platform.OS === 'ios' && showPicker ? (
        <Pressable
          onPress={() => setShowPicker(false)}
          style={[styles.doneButton, { backgroundColor: colors.tint }]}
        >
          <ThemedText style={styles.doneText}>완료</ThemedText>
        </Pressable>
      ) : null}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
  field: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  value: {
    fontSize: 16,
  },
  doneButton: {
    alignSelf: 'flex-end',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  doneText: {
    color: '#fff',
    fontWeight: '600',
  },
});

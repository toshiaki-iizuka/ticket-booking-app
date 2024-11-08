import { Button } from "@/components/Button";
import { HorizontalStack } from "./HorizontalStack";
import { Platform } from "react-native";
import RNDateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import { Text } from "@/components/Text";

interface DateTimePickerProps {
  onChange: (date: Date) => void;
  currentDate: Date;
}

export const DateTimePicker = (props: DateTimePickerProps) => {
  if (Platform.OS === "android") {
    return <AndroidDateTimePicker {...props} />;
  }

  if (Platform.OS === "ios") {
    return <IOSDateTimePicker {...props} />;
  }

  return null;
};

const AndroidDateTimePicker = ({
  onChange,
  currentDate,
}: DateTimePickerProps) => {
  const showDatePicker = () => {
    DateTimePickerAndroid.open({
      value: currentDate,
      onChange: (_, date?: Date) => {
        if (date) {
          showTimePicker(date);
        }
      },
      mode: "date",
    });
  };

  const showTimePicker = (date: Date) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange: (_, time?: Date) => {
        if (time) {
          const newDateTime = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            time.getHours(),
            time.getMinutes()
          );
          onChange(newDateTime);
        }
      },
      mode: "time",
    });
  };

  return (
    <HorizontalStack p={10} alignItems="center" justifyContent="space-between">
      <Text>{currentDate.toLocaleDateString()}</Text>
      <Button variant="outlined" onPress={showDatePicker}>
        Open Calendar
      </Button>
    </HorizontalStack>
  );
};

const IOSDateTimePicker = ({ onChange, currentDate }: DateTimePickerProps) => {
  return (
    <RNDateTimePicker
      style={{ alignSelf: "flex-start" }}
      accentColor="black"
      minimumDate={new Date()}
      value={currentDate}
      mode={"datetime"}
      display="default"
      onChange={(_, date) => onChange(date || new Date())}
    />
  );
};

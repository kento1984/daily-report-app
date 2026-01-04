import { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { supabase } from '../lib/supabase'
import { ReportInsert } from '../types/Report'

export default function CreateReportScreen() {
  const navigation = useNavigation()
  const today = new Date().toISOString().split('T')[0]

  const [date, setDate] = useState(today)
  const [visitLocation, setVisitLocation] = useState('')
  const [activityContent, setActivityContent] = useState('')
  const [notes, setNotes] = useState('')
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    if (!date || !visitLocation || !activityContent) {
      Alert.alert('エラー', '日付、訪問先、活動内容は必須です')
      return
    }

    setSaving(true)

    const report: ReportInsert = {
      date,
      visit_location: visitLocation,
      activity_content: activityContent,
      notes,
    }

    const { error } = await supabase.from('reports').insert(report)

    setSaving(false)

    if (error) {
      console.error('Error saving report:', error)
      Alert.alert('エラー', '保存に失敗しました')
      return
    }

    navigation.goBack()
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.scrollView}>
        <View style={styles.form}>
          <Text style={styles.label}>日付 *</Text>
          <TextInput
            style={styles.input}
            value={date}
            onChangeText={setDate}
            placeholder="YYYY-MM-DD"
          />

          <Text style={styles.label}>訪問先 *</Text>
          <TextInput
            style={styles.input}
            value={visitLocation}
            onChangeText={setVisitLocation}
            placeholder="訪問先を入力"
          />

          <Text style={styles.label}>活動内容 *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={activityContent}
            onChangeText={setActivityContent}
            placeholder="活動内容を入力"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />

          <Text style={styles.label}>備考</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={notes}
            onChangeText={setNotes}
            placeholder="備考を入力（任意）"
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />

          <TouchableOpacity
            style={[styles.button, saving && styles.buttonDisabled]}
            onPress={handleSave}
            disabled={saving}
          >
            <Text style={styles.buttonText}>
              {saving ? '保存中...' : '保存'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  form: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  textArea: {
    minHeight: 100,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
})

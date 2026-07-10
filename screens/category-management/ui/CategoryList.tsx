import type { Category } from '@/entities/category';
import { ThemedText } from '@/shared/ui';
import { StyleSheet, View } from 'react-native';
import { CategoryCard } from './CategoryCard';

type Props = {
  title: string;
  categories: Category[];
};

export const CategoryList = ({ title, categories }: Props) => {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <ThemedText type="subtitle">{title}</ThemedText>
      </View>

      {categories.length === 0 ? (
        <ThemedText style={styles.empty}>
          등록된 카테고리가 없습니다.
        </ThemedText>
      ) : (
        categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    gap: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addText: {
    fontSize: 14,
    fontWeight: '600',
  },
  empty: {
    opacity: 0.6,
    fontSize: 14,
    paddingVertical: 8,
  },
});

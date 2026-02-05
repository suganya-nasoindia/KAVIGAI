import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  StyleSheet,
} from 'react-native';

type Props = {
  todoId: string;
};

type Comment = {
  id: string;
  userName: string;
  comment: string;
  createdAt: string;
};

const TodoComments: React.FC<Props> = ({ todoId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    fetchComments();
  }, [todoId]);

  const fetchComments = async () => {
    setLoading(true);

    // 🔹 Replace with API call
    const response: Comment[] = [
      {
        id: '1',
        userName: 'Admin',
        comment: 'This is a sample comment',
        createdAt: 'Today',
      },
    ];

    setComments(response);
    setLoading(false);
  };

  const addComment = async () => {
    if (!commentText.trim()) return;

    // 🔹 Replace with API call
    const newComment: Comment = {
      id: Date.now().toString(),
      userName: 'You',
      comment: commentText,
      createdAt: 'Now',
    };

    setComments(prev => [newComment, ...prev]);
    setCommentText('');
    setShowDialog(false);
  };

  const renderItem = ({ item }: { item: Comment }) => (
    <View style={styles.commentCard}>
      <Text style={styles.user}>{item.userName}</Text>
      <Text style={styles.comment}>{item.comment}</Text>
      <Text style={styles.date}>{item.createdAt}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => setShowDialog(true)}
      >
        <Text style={styles.addText}>Add Comment</Text>
      </TouchableOpacity>

      {comments.length === 0 ? (
        <Text style={styles.emptyText}>No comments</Text>
      ) : (
        <FlatList
          data={comments}
          keyExtractor={item => item.id}
          renderItem={renderItem}
        />
      )}

      {/* Comment Dialog */}
      <Modal transparent visible={showDialog} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Add Comment</Text>

            <TextInput
              style={styles.input}
              placeholder="Enter comment"
              multiline
              value={commentText}
              onChangeText={setCommentText}
            />

            <View style={styles.actions}>
              <TouchableOpacity onPress={() => setShowDialog(false)}>
                <Text style={styles.cancel}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={addComment}>
                <Text style={styles.ok}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TodoComments;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 12,
    },
    addBtn: {
      alignSelf: 'flex-end',
      marginBottom: 10,
    },
    addText: {
      color: '#007AFF',
      fontSize: 16,
    },
    commentCard: {
      backgroundColor: '#F5F5F5',
      padding: 12,
      borderRadius: 8,
      marginBottom: 8,
    },
    user: {
      fontWeight: '600',
    },
    comment: {
      marginTop: 4,
    },
    date: {
      fontSize: 12,
      color: '#888',
      marginTop: 4,
    },
    emptyText: {
      textAlign: 'center',
      marginTop: 40,
      color: '#888',
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.4)',
      justifyContent: 'center',
      padding: 20,
    },
    modalBox: {
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 16,
    },
    modalTitle: {
      fontSize: 18,
      marginBottom: 10,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 6,
      padding: 10,
      minHeight: 80,
      textAlignVertical: 'top',
    },
    actions: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginTop: 15,
    },
    cancel: {
      marginRight: 20,
      color: '#666',
    },
    ok: {
      color: '#007AFF',
      fontWeight: '600',
    },
  });
  
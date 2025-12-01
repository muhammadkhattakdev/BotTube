from rest_framework import serializers


class ChatRequestSerializer(serializers.Serializer):
    
    video_id = serializers.CharField(
        max_length=20,  
        required=True,  
        help_text="YouTube video ID (e.g., 'dQw4w9WgXcQ')"
    )
    
    question = serializers.CharField(
        max_length=1000,  # Limit question length to prevent abuse
        required=True,
        help_text="User's question about the video",
        allow_blank=False,  
        trim_whitespace=True  
    )
    
    def validate_video_id(self, value):

        if len(value) < 10:
            raise serializers.ValidationError(
                "Video ID seems too short. Please provide a valid YouTube video ID."
            )
        
        return value
    
    def validate_question(self, value):
        """
        Custom validation for question field.
        """
        # Ensure question is not just whitespace
        if not value.strip():
            raise serializers.ValidationError(
                "Question cannot be empty."
            )

        # Ensure question is at least 2 characters
        if len(value.strip()) < 2:
            raise serializers.ValidationError(
                "Question is too short. Please ask a more detailed question."
            )
        
        return value


class ChatResponseSerializer(serializers.Serializer):
    
    answer = serializers.CharField(
        help_text="AI-generated answer to the user's question"
    )

    video_id = serializers.CharField(
        help_text="The video ID that was queried"
    )


class ErrorResponseSerializer(serializers.Serializer):

    error = serializers.CharField(
        help_text="Brief error message"
    )
    
    detail = serializers.CharField(
        required=False,
        help_text="Detailed error information (for debugging)"
    )
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import ChatRequestSerializer, ChatResponseSerializer
from .services.rag_service import RAGService
import logging

logger = logging.getLogger(__name__)

rag_service = RAGService()


@api_view(['POST'])
def chat_with_video(request):
    
    serializer = ChatRequestSerializer(data=request.data)
    
    if not serializer.is_valid():
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )
    
    video_id = serializer.validated_data['video_id']
    question = serializer.validated_data['question']
    
    try:
        answer = rag_service.get_answer(video_id, question)
        
        response_data = {
            'answer': answer,
            'video_id': video_id
        }
        
        response_serializer = ChatResponseSerializer(data=response_data)
        
        if response_serializer.is_valid():
            return Response(
                response_serializer.validated_data,
                status=status.HTTP_200_OK
            )
        
        return Response(
            response_serializer.errors,
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
        
    except Exception as e:
        logger.error(f"Error processing chat request: {str(e)}")
        
        return Response(
            {
                'error': 'Failed to process your question. Please ensure the video has captions available.',
                'detail': str(e)
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['GET'])
def health_check(request):
    """
    Simple endpoint to check if the API is running.
    Useful for monitoring and debugging.
    """
    return Response(
        {'status': 'ok', 'message': 'API is running'},
        status=status.HTTP_200_OK
    )
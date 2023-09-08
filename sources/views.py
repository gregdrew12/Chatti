from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status


@api_view(['GET', 'POST'])
def is_article(request):
    if request.method == 'GET':
        url = request.GET.get('url', '')
        parsed_url = ''.join([s for s in url.split('/') if s!= ''][-4:-1])
        response_data = {'is_article': False}

        if parsed_url.isnumeric() and len(parsed_url) == 8:
            response_data['is_article'] = True


        return Response(response_data, status=status.HTTP_200_OK)

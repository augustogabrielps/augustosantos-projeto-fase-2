import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'photos_mock.dart';

class PhotosScreen extends StatelessWidget {
  const PhotosScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Photos (Flutter)')),
      body: ListView.builder(
        itemCount: mockPhotos.length,
        itemBuilder: (context, index) {
          final photo = mockPhotos[index];

          return Card(
            margin: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
            child: InkWell(
              onTap: () {
                final formatted = DateFormat('dd/MM/yyyy HH:mm').format(photo.dateTime);

                showModalBottomSheet(
                  context: context,
                  isScrollControlled: true,
                  builder: (ctx) => SingleChildScrollView(
                    child: Padding(
                      padding: EdgeInsets.only(
                        left: 16.0,
                        right: 16.0,
                        top: 16.0,
                        bottom: MediaQuery.of(ctx).viewInsets.bottom + 24.0,
                      ),
                      child: Column(
                        mainAxisSize: MainAxisSize.min,
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          SizedBox(
                            width: double.infinity,
                            height: 260,
                            child: Image.network(photo.url, fit: BoxFit.cover),
                          ),
                          const SizedBox(height: 16),
                          Text(
                            photo.title,
                            style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                          ),
                          const SizedBox(height: 8),
                          Text(formatted, style: Theme.of(ctx).textTheme.bodyMedium),
                          const SizedBox(height: 8),
                          Text('ID: ${photo.id} — Album: ${photo.albumId}', style: Theme.of(ctx).textTheme.bodySmall),
                          const SizedBox(height: 16),
                        ],
                      ),
                    ),
                  ),
                );
              },
              child: Padding(
                padding: const EdgeInsets.all(8.0),
                child: Row(
                  children: [
                    Image.network(photo.thumbnailUrl, width: 100, height: 100, fit: BoxFit.cover),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(photo.title, style: const TextStyle(fontWeight: FontWeight.bold)),
                          const SizedBox(height: 6),
                          Text('ID: ${photo.id} — Album: ${photo.albumId}', style: Theme.of(context).textTheme.bodySmall),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
          );
        },
      ),
    );
  }
}
